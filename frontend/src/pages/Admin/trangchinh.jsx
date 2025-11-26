import Sidebar from "../../components/Sidebar";
import Topbar from "../../components/Topbar";

export default function main() {
    return (
        <div style={{ display: "flex" }}>
            <Sidebar />
            <div style={{ width: "100%" }}>
                <Topbar />
            </div>
        </div>
    );
}
