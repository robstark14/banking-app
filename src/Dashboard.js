const Dashboard = (prop) => {
  const { name, email } = prop;
  return (
    <div>
      <p>Hi, {name}</p>
      <p>{email}</p>
    </div>
  );
};

export default Dashboard;
