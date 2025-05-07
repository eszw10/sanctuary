import Button from "../../ui/Button";
import Modal from "../../ui/Modal";
import CreateCabinForm from "./CreateCabinForm";

function AddCabin() {
  return (
    <Modal>
      <Modal.Open opens="create-cabin">
        <div>
          <Button> Create a new cabin</Button>
        </div>
      </Modal.Open>
      <Modal.Window name="create-cabin">
        <CreateCabinForm />
      </Modal.Window>
    </Modal>
  );

  //   const [isModalOpen, setIsModalOpen] = useState(false);

  //   return (
  //     <>
  //       <Button onClick={() => setIsModalOpen((modal) => !modal)}>
  //         Create a new cabin
  //       </Button>
  //       {isModalOpen && (
  //         <Modal onClose={() => setIsModalOpen(false)}>
  //           <CreateCabinForm onCloseModal={() => setIsModalOpen(false)} />
  //         </Modal>
  //       )}
  //     </>
  //   );
}

export default AddCabin;
