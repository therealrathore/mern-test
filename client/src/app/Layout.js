import Sidebar from '../components/layouts/Sidebar';

const Layout = ({Data}) => {

	return(
		<div>
			<Sidebar />
			<Data />
		</div>
	)
}

export default Layout