import Button from '~/components/Button';
import { useAuth } from '~/context/AuthContext';

function DashBoard(): JSX.Element {
    const { logout } = useAuth()!;
    return (
        <>
            <h1>DashBoard</h1>
            <Button onClick={logout} to="/auth/login" children="LogOut" />
        </>
    );
}
export default DashBoard;
