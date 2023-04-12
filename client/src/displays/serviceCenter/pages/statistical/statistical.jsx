import './statistical.css';
import Sidebar from '../sidebar/sidebar';
import Navbar from '../../../../components/navbar/navbar';


export default function Statistical() {
    return(
        <div className="statistical">
            <Sidebar/>
            <div className="wrapper">
                <Navbar/>
                <div className="mainStatistical">
                statistical
                </div>
            </div>
        </div>
    )
}