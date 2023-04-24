import { fireEvent, render, screen } from '@testing-library/react-native';

import StoreModal from '../src/components/StoreModal';

describe('<StoreModal />', () => {
	test('should close modal on button click', () => {
		const onCloseModal = jest.fn();
		render(<StoreModal
			closeModal={onCloseModal}
			isModalVisible
			storeData={{
				address: {
					coordinate: {
						lat: '1',
						lng: '2',
					},
				},
				id: '1234',
				name: 'Tiendanimal',
				schedule: {
					end: '8:00pm',
					from: '8:00am',
				},
				tasks: [
					{
						description: 'Sell dog food',
						id: '1',
					},
				],
			}}
		/>);

		const closeButton = screen.queryByText('Close');
		fireEvent.press(closeButton);

		expect(onCloseModal).toBeCalled();
	});
});
