"use strict";

import IdentificationRrz from "./IdentificationRrz.react";


const IdentificationRrzModal=(props)=>
	{
		return 	<div id={props.id} className="modal" style={props.style}>
					<div className="modal-content">
						<IdentificationRrz 
							firstName={props.firstName}
							middleName={props.middleName} 
							lastName={props.lastName} 
							birthday={props.birthday} 
							polisSerie={props.polisSerie} 
							polisNumber={props.polisNumber} 
							emptyMiddleName={props.emptyMiddleName}
							datesTreatment={props.datesTreatment}
							onResultRowDoubleClick={props.onResultRowDoubleClick}>
						</IdentificationRrz>
					</div>
					<div className="modal-footer">
						<a href="#!" className="modal-action modal-close waves-effect waves-green btn-flat">Отмена</a>
					</div>
				</div>
	};

export default IdentificationRrzModal;