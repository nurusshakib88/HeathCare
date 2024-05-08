import { useLogin } from "../context/LoginContext";

const UserProfile = () => {
  const { user, loading, error } = useLogin();

  const calculateAge = (birthdate) => {
    const today = new Date();
    const birthDate = new Date(birthdate);

    let years = today.getFullYear() - birthDate.getFullYear();
    let months = today.getMonth() - birthDate.getMonth();

    if (months < 0 || (months === 0 && today.getDate() < birthDate.getDate())) {
      years--;
      months += 12;
    }

    return `${years} years, ${months} months`;
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!user) {
    return <div>User not found.</div>;
  }

  return (
    <div>
      <h2>User Profile</h2>
      <p>Name: {user.name}</p>
      <p>Name: {user._id}</p>
      <p>Email: {user.email}</p>
      <p>Phone: {user.phone}</p>
      <p>Age: {calculateAge(user.age)}</p>
      {user.selectedDivision && <p>Division: {user.selectedDivision}</p>}
      {user.selectedDistrict && <p>District: {user.selectedDistrict}</p>}
      <img
        src={user.imageUrl}
        alt=""
        className="h-32 w-32 object-cover rounded-full"
      />
    </div>
  );
};

export default UserProfile;
