import {ComponentPreview, Previews} from "@react-buddy/ide-toolbox";
import {PaletteTree} from "./palette";
import HomePage from "../pages/HomePage/HomePage";
import Navbar from "../components/Navbar";

const ComponentPreviews = () => {
    return (
        <Previews palette={<PaletteTree/>}>
            <ComponentPreview path="/HomePage">
                <HomePage/>
            </ComponentPreview>
            <ComponentPreview path="/Navbar">
                <Navbar/>
            </ComponentPreview>
        </Previews>
    );
};

export default ComponentPreviews;