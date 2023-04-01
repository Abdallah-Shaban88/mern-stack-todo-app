import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";

function NormalForm({ children, submitHandler }) {
 const navigate = useNavigate();
 return (
  <Form className="w-75 mx-auto" onSubmit={submitHandler}>
   {children}
   <Button className="mt-3" variant="primary" type="submit">
    Submit
   </Button>
   <Button className="mt-3 ms-3" variant="primary" onClick={() => navigate("/")}>
    cancel
   </Button>
  </Form>
 );
}

export default NormalForm;
