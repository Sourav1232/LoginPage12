import CustomErrorMessage from './ErrorMessage'; // Rename the imported component

const YourComponent = () => {
  const errorMessage = 'This is an error message'; // Ensure unique variable names

  return (
    <div>
      <h1>Your Component</h1>
      <CustomErrorMessage message={errorMessage} /> {/* Use the renamed component */}
    </div>
  );
};

export default YourComponent;
