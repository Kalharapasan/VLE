import { Card } from 'react-bootstrap';

export default function TeacherCard({ admin }) {
    const {
        admin_fname,
        admin_lname,
        admin_email,
        admin_nic,
        admin_birthday,
        admin_gender,
        admin_address,
        admin_img,
    } = admin;

    return (
        <Card className="mb-4 shadow-sm">
            {admin_img && (
                <Card.Img
                    variant="top"
                    src={`http://localhost:8000/storage/${admin_img}`}
                    alt={`${admin_fname} ${admin_lname}`}
                    style={{ height: '200px', objectFit: 'cover' }}
                />
            )}
            <Card.Body>
                <Card.Title>
                    {admin_fname} {admin_lname}
                </Card.Title>
                <Card.Text>
                    <strong>Email:</strong> {admin_email} <br />
                    <strong>NIC:</strong> {admin_nic} <br />
                    <strong>Birthday:</strong> {admin_birthday} <br />
                    <strong>Gender:</strong> {admin_gender} <br />
                    <strong>Address:</strong> {admin_address}
                </Card.Text>
            </Card.Body>
        </Card>
    );
}
