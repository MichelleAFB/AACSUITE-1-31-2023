import {render, screen,cleanup} from '@testing-library/react'
import PublicEventModal from '../components/EventList/PublicEventModal'

test('should render public event modal',() =>{
  render(<PublicEventModal/>)
  const modalElement=screen.getAllByTestId('modal-public')
  expect(modalElement).toBeInTheDocument();
})
