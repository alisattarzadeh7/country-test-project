import {render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'
import Home from "~/src/pages";
import RegionSelect from "~/components/RegionSelect";


describe('Region Select test',()=>{
        it('if it exists in the document', async () => {
                const home = render(<RegionSelect  />);
                const regionSelect = screen.getByRole('get-by-region');
                expect(regionSelect).toBeInTheDocument();
        })


})