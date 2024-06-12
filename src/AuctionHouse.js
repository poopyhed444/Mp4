import React, { useEffect, useState } from 'react';
import { supabase } from './supabase';
import { Card, Text, Button, Group, Image, Modal, NumberInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import styles from './AuctionHouse.module.css';

const AuctionHouse = ({ userId }) => {
    const [auctions, setAuctions] = useState([]);
    const [bidModalOpened, setBidModalOpened] = useState(false);
    const [selectedAuction, setSelectedAuction] = useState(null);

    useEffect(() => {
        const fetchAuctions = async () => {
            if (!userId) return;
            let { data: auctions, error } = await supabase
                .from('products')
                .select('*')
                .eq('isauction', true);

            if (error) {
                console.error('error', error);
            } else {
                const mappedAuctions = auctions.map(auction => ({
                    ...auction,
                    isAuctionActive: new Date(auction.timeend) > new Date(),
                    remainingTime: calculateTimeLeft(new Date(auction.timeend))
                }));
                setAuctions(mappedAuctions);
                updateAuctionTimes(mappedAuctions); // Initialize timer for countdowns
            }
        };

        fetchAuctions();
    }, [userId]);

    useEffect(() => {
        const interval = setInterval(() => {
            updateAuctionTimes(auctions);
        }, 1000); // Update every second

        return () => clearInterval(interval);
    }, [auctions]);

    const updateAuctionTimes = (auctions) => {
        const updatedAuctions = auctions.map(auction => ({
            ...auction,
            remainingTime: calculateTimeLeft(new Date(auction.timeend))
        }));
        setAuctions(updatedAuctions);
    };

    const calculateTimeLeft = (endDate) => {
        const now = new Date();
        const difference = endDate.getTime() - now.getTime();
        if (difference < 0) {
            return 'Auction ended';
        }

        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((difference / 1000 / 60) % 60);
        const seconds = Math.floor((difference / 1000) % 60);
        return `${days}d ${hours}h ${minutes}m ${seconds}s`;
    };

    const form = useForm({
        initialValues: {
            bidAmount: 0,
        },
    });

    const handlePlaceBid = (auction) => {
        if (!auction.isAuctionActive) {
            alert('This auction has ended.');
            return;
        }
        setSelectedAuction(auction);
        setBidModalOpened(true);
        const minimumBid = auction.price + 1;
        form.setFieldValue('bidAmount', minimumBid);
    };

    const submitBid = async (values) => {
        if (!selectedAuction.isAuctionActive) {
            alert('This auction has ended.');
            return;
        }

        const { bidAmount } = values;

        if (bidAmount <= selectedAuction.price) {
            alert(`Your bid must be higher than the current bid of $${selectedAuction.price}`);
            return;
        }

        const { data, error } = await supabase
            .from('products')
            .update({
                price: bidAmount,
                bidder: userId,
            })
            .eq('id', selectedAuction.id);

        if (error) {
            console.error('Error submitting bid:', error);
            alert('Failed to place bid: ' + error.message);
        } else {
            console.log('Bid successfully placed:', data);
            alert('Bid successfully placed!');
            setBidModalOpened(false);
        }
    };

    return (
        <div className={styles.productList}>
            {auctions.map((auction) => (
                <Card key={auction.id} className={styles.productCard} shadow="sm" p="lg" radius="md" withBorder>
                    <Image
                        src={auction.image}
                        alt={auction.name}
                        className={styles.productImage}
                    />
                    <Text weight={500} className={styles.productName}>{auction.name}</Text>
                    <Text size="sm" className={styles.productDescription}>{auction.description}</Text>
                    <Group position="apart" style={{ marginTop: 20 }}>
                        <Text>Current Bid: ${auction.price}</Text>
                        <Text size="sm" className={styles.productDescription}>{auction.remainingTime}</Text>
                        <Button
                            variant="outline"
                            className={styles.productButton}
                            onClick={() => handlePlaceBid(auction)}
                            disabled={!auction.isAuctionActive}
                        >
                            Place Bid
                        </Button>
                    </Group>
                </Card>
            ))}
            <Modal
                opened={bidModalOpened}
                onClose={() => setBidModalOpened(false)}
                title={`Place a bid on ${selectedAuction?.name}`}
            >
                <form onSubmit={form.onSubmit(submitBid)}>
                    <NumberInput
                        label="Your Bid"
                        {...form.getInputProps('bidAmount')}
                        required
                        min={selectedAuction ? selectedAuction.price + 1 : 0}
                    />
                    <Button type="submit" mt="md">Submit Bid</Button>
                </form>
            </Modal>
        </div>
    );
}

export default AuctionHouse;
