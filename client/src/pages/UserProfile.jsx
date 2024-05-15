import { useLogin } from "../context/LoginContext";

const UserProfile = () => {
  const { user, loading, error, isLoggedIn } = useLogin();

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

  return isLoggedIn ? (
    <div className="px-32 py-10 grid grid-cols-3 gap-10 h-[90vh]">
      <div className="col-span-1">
        <img
          src={user.imageUrl}
          alt=""
          className="w-full h-[400px] object-cover rounded-xl"
        />
      </div>
      <div className="col-span-2">
        <h2 className="text-2xl font-bold mb-3">User Profile</h2>
        <p>
          <strong>Name: </strong> {user.name}
        </p>
        <p>
          <strong>Email: </strong> {user.email}
        </p>
        <p>
          <strong>Phone: </strong> {user.phone}
        </p>
        <p>
          <strong>Age: </strong> {calculateAge(user.age)}
        </p>
        <p>
          <strong>Location: </strong>
          {user.selectedDistrict}, {user.selectedDivision}
        </p>
      </div>
    </div>
  ) : (
    "User Not Found"
  );
};

export default UserProfile;
