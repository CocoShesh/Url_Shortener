import Navbar from "./components/Header/Navbar";
import InputUrl from "./components/Input/InputUrl";
import Table from "./components/Table/Table";

function App() {
  return (
    <>
      <main className=" bg-cubes  bg-cover w-full bg-no-repeat min-h-screen bg-center px-5 py-10 ">
        <Navbar />
        <InputUrl />
        <Table />
      </main>
    </>
  );
}

export default App;
