import React from "react";
import { BiTrash } from "react-icons/bi";

// Render the list of appointments as a component
// Receives props from App.js and deleteAppointment function

const AppointmentInfo = ({
	appointmentData,
	deleteAppointment,
}) => {
	return (
		<div>
			<li className="px-3 py-3 flex items-start">
				{/* delete button */}
				<button
					// calls the deleteAppointment function defined in App.js and passed down through props
					onClick={() =>
						deleteAppointment(appointmentData.id)
					}
					type="button"
					className="p-1.5 mr-1.5 mt-1 rounded text-white bg-red-500 hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
				>
					<BiTrash />
				</button>
				<div className="flex-grow">
					<div className="flex items-center">
						<span className="flex-none font-medium text-2xl text-blue-500">
							{appointmentData.petName}
						</span>
						<span className="flex-grow text-right">
							{appointmentData.aptDate}
						</span>
					</div>
					<div>
						<b className="font-bold text-blue-500">
							Owner:
						</b>{" "}
						{appointmentData.ownerName}
					</div>
					<div className="leading-tight">
						{appointmentData.aptNotes}
					</div>
				</div>
			</li>
		</div>
	);
};
export default AppointmentInfo;
