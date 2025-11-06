import { useNavigate } from 'react-router-dom'
import { Button } from '../components/Button.tsx'

export const Unauthorized = () => {
    const navigate = useNavigate()

    return (
        <div className="d-flex flex-column align-items-center justify-content-center min-vh-100">
            <h1 className="display-1 text-danger">403</h1>
            <h2 className="mb-4">Unauthorized Access</h2>
            <p className="text-muted mb-4">
                You don't have permission to access this page.
            </p>
            <div className="d-flex gap-3">
                <Button onclick={() => navigate(-1)}>
                    Go Back
                </Button>
                <Button onclick={() => navigate('/welcome')}>
                    Go to Home
                </Button>
            </div>
        </div>
    )
}