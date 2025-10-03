import { Chart as ChartJS } from "chart.js/auto"
import { useState } from "react"
import { Bar } from 'react-chartjs-2'
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";

ChartJS.register(
    CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend
)


function Report() { 
    return (
        <>

        </>
    )
}
export default Report