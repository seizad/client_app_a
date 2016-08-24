angular.module('MSWebClient')
	.constant('GLOBAL_CONF',{
		apiUrl: 'http://localhost:4000',
		screenSizes: {
			minDesktopSize: 800,
			minTabletSize: 500
		},
		availablePermissions: [
			'role.customerPortal', 
			'role.technicianPortal'
		],
		grids: {
			storeState: false
		}
	});