import { HiChevronDoubleLeft, HiChevronDoubleRight } from "react-icons/hi";
import Wrapper from "../assets/wrappers/PageBtnContainer";
import { useLocation, useNavigate } from "react-router-dom";
import { useAllJobsContext } from "../pages/AllJobs";
const PageBtnContainer = () => {
    const { data } = useAllJobsContext();
    const { currentPage, numOfPages } = data;
    const pages = Array.from({ length: numOfPages }, (_, index) => {
        return index + 1;
    });
    console.log(pages);
    // console.log(currentPage, numOfPages);

    const { search, pathname } = useLocation();
    const navigate = useNavigate();
    console.log("search", search, "path name", pathname);
    /// for handling pagination click change
    const handlePageChange = (pageNumber) => {
        const searchParams = new URLSearchParams(search);
        searchParams.set('page', pageNumber)
        navigate(`${pathname}?${searchParams.toString()}`)
        console.log(pageNumber)
    }
    const addPageButton = ({ pageNumber, activeClass }) => {
        return (
            <button
                className={`btn page-btn ${activeClass && "active"}`}
                key={pageNumber} onClick={() => handlePageChange(pageNumber)}
            >
                {pageNumber}
            </button>
        )
    };
    const renderPageButtons = () => {
        const pageButtons = [];
        /// for first page
        pageButtons.push(addPageButton({ pageNumber: 1, activeClass: currentPage === 1 }))
        // showing dots after third page
        if (currentPage > 3) {
            pageButtons.push(<span className="page-btn dots" key="dots-1">...
            </span>)
        }
        // for the page before the current page
        if (currentPage !== 1 && currentPage !== 2) {
            pageButtons.push(addPageButton({ pageNumber: currentPage - 1, activeClass: false }))
        }
        // for current page
        if (currentPage !== 1 && currentPage !== numOfPages) {
            pageButtons.push(addPageButton({ pageNumber: currentPage, activeClass: true }))
        }
        // for the page before the last page
        if (currentPage !== numOfPages && currentPage !== numOfPages - 1) {
            pageButtons.push(addPageButton({ pageNumber: currentPage + 1, activeClass: false }))
        }
        if (currentPage < numOfPages - 2) {
            pageButtons.push(<span className="page-btn dots" key="dots+1">...
            </span>)
        }
        /// for last page 
        pageButtons.push(addPageButton({ pageNumber: numOfPages, activeClass: currentPage === numOfPages }))
        return pageButtons;
    }
    return (
        <Wrapper>
            <button className="btn prev-btn" onClick={() => {
                let prevPage = currentPage - 1;
                if (prevPage < 1) prevPage = 1;
                handlePageChange(prevPage)
            }}>
                <HiChevronDoubleLeft />
                Prev
            </button>
            <div className="btn-container">
                {renderPageButtons()}
            </div>
            <button className="btn prev-btn" onClick={() => {
                let nextPage = currentPage + 1;
                if (nextPage > numOfPages) nextPage = 1;
                handlePageChange(nextPage)
            }}>
                <HiChevronDoubleRight />
                Next
            </button>
        </Wrapper>
    )
}

export default PageBtnContainer