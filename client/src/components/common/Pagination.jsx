import { usePagination, DOTS } from '../../hooks/usePagination'
const Pagination = props => {

	const {
        onPageChange,
        totalCount,
        siblingCount = 1,
        currentPage,
        pageSize,
    } = props;

    const paginationRange = usePagination({
        currentPage,
        totalCount,
        siblingCount,
        pageSize
    });

    if (currentPage === 0 || paginationRange.length < 2) {
        return null;
    }

    let lastPage = paginationRange[paginationRange.length - 1];

    const onNext = () => {
        if(lastPage !== currentPage) {
            onPageChange(currentPage + 1);
        }
    };

    const onPrevious = () => {
        if(currentPage !== 1) {
            onPageChange(currentPage - 1);
        }
    };

	return(
	<center>
		<div className="pagination">
		  	<a onClick={onPrevious} href="#">&laquo;</a>
			{
                paginationRange.map(pageNumber => {
                    if (pageNumber === DOTS) {
                        return (<a  href="#" key={pageNumber+1}>&#8230;</a>)
                    }

                    return (<a href="#" onClick={() => onPageChange(pageNumber)} className={`${pageNumber === currentPage ? 'active' : ''}`}>{pageNumber}</a>)
                    }
                )
            }
		  	<a onClick={onNext} href="#">&raquo;</a>
		</div>
	</center>

	)
}

export default Pagination