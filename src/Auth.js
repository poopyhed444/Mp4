import reportWebVitals from './reportWebVitals';
import { useState, useEffect } from 'react'
import { createClient } from '@supabase/supabase-js'
import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'

const supabase = createClient('https://pfxwcaazndqgfekaisrj.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBmeHdjYWF6bmRxZ2Zla2Fpc3JqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTc3MTQ1NzksImV4cCI6MjAzMzI5MDU3OX0.fIOkcYr8uIgYcbRbYVzjvcLHU6yNC4gPUOcvckWFdL4')
export default function App() {
    const [session, setSession] = useState(null)

    useEffect(() => {
        supabase.auth.getSession().then(({ data: { session } }) => {
            setSession(session)
        })

        const {
            data: { subscription },
        } = supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session)
        })

        return () => subscription.unsubscribe()
    }, [])

    if (!session) {
        return (<Auth supabaseClient={supabase} appearance={{ theme: ThemeSupa }}     providers={['google']}/>)
    }
    else {
        return (<div>Logged in!</div>)
    }
}