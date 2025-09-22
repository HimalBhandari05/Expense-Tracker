import Expenses from "../components/Expenses";
import Navbar from "../components/Navbar";

function Home(){
    return(
        <>
            <header>
                <Navbar />
            </header>
            <main className="p-2">
                <Expenses />
            </main>
        </> 
    )
}

export default Home;