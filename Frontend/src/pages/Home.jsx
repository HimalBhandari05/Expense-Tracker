import Expenses from "../components/Expenses";
import Navbar from "../components/Navbar";

function Home(){
    return(
        <>
            <header>
                <Navbar />
            </header>
            <main>
                <Expenses />
            </main>
        </> 
    )
}

export default Home;