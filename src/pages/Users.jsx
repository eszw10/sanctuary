import Heading from "../ui/Heading";
import SignUpForm from "../features/authentication/SignupForm";

function NewUsers() {
  return (
    <div className="">
      <Heading as="h1">Create a new user</Heading>
      <SignUpForm />
    </div>
  );
}

export default NewUsers;
