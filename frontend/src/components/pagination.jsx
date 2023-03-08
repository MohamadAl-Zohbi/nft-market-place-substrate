import Pagination from '@mui/material/Pagination';

function PaginationCard({ count, page, onChange }) {
    return (
        <div>
            <div className="flex-center">
                <Pagination
                    shape="rounded"
                    color="secondary"
                    count={count}
                    page={page}
                    onChange={onChange}
                    sx={{
                        backgroundColor: 'var(--yellow-color)',
                        marginBottom: '50px',
                        padding: '4px 0',
                        borderRadius: '10px',
                        "& .MuiPaginationItem-root": {
                            color: 'var(--violette-color)'
                        },
                    }} />
            </div>
        </div>
    )
}

export default PaginationCard