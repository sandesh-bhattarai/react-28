import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { toast } from "react-toastify";
import axiosInstance from "../../config/axios.config";
import PaginationComponent from "../../components/common/table/pagination.component";
import TableActionButtons from "../../components/common/table/action-buttons.component";
import { LoadingComponent } from "../../components/common";

import { useDispatch, useSelector } from "react-redux";
import { helloWorld } from "../../reducer/banner.reducer";

export const PER_PAGE_LIMIT = 15;

const AdminBanner = () => {
    
    const [loading, setLoading] = useState(true)

    // trigger/fire
    const dispatch = useDispatch()

    // listen 
    const bannerData = useSelector((root: any) => {
        return root.banner.listAll;
    })
    const [pagination, setPagination] = useState({
        totalPages: 1,
        currentPage: 1
    })

    const getBannerList = async ({ page = 1, limit = PER_PAGE_LIMIT }) => {
        try {
            setLoading(true)
            const response: any = await axiosInstance.get('/banner', {
                params: {
                    page: page,
                    limit: limit
                },
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("accessToken")
                }
            })
            const totalPages = Math.ceil(response.meta.total / response.meta.limit)
            setPagination({
                totalPages: totalPages,
                currentPage: response.meta.page
            })
            dispatch(helloWorld(response.result))
            // setData(response.result)
        } catch (exception) {
            // api call error 
            toast.error("Error fetching banner...")
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        // API Call to get Data
        getBannerList({ page: 1, limit: PER_PAGE_LIMIT })


    }, [])


    const deleteBanner = async(id: string) => {
        try {
            setLoading(true);
            await axiosInstance.delete(
                '/banner/'+id,
                {
                    headers: {
                        "Authorization": "Bearer "+localStorage.getItem("accessToken")
                    }
                }
            )
            toast.success("Banner Deleted successfully")
            getBannerList({page: 1, limit: PER_PAGE_LIMIT})
        } catch(exception) {
            toast.error("Banner cannot be deleted at this moment")
            console.log(exception);
        }
    }

    return (<>
        <section>
            <div className="mx-auto max-w-screen-xl px-4 py-4 sm:px-6 lg:px-8 ">
                <div className="grid grid-cols-3 gap-8 lg:gap-16">
                    <h1 className="text-4xl font-bold">Banner List</h1>
                    <div></div>
                    <NavLink className={"bg-green-800 mt-3 text-center py-2 px-2 text-white rounded w-[200px]"} to="/admin/banner/create">
                        Create Banner
                    </NavLink>
                </div>

                <div className="rounded-lg border border-gray-200 mt-8">
                    <div className="overflow-x-auto rounded-t-lg">
                        <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
                            <thead className="ltr:text-left rtl:text-right bg-black">
                                <tr>
                                    <th className="whitespace-nowrap px-4 py-2 font-medium text-white">Title</th>
                                    <th className="whitespace-nowrap px-4 py-2 font-medium text-white">Link</th>
                                    <th className="whitespace-nowrap px-4 py-2 font-medium text-white">Image</th>
                                    <th className="whitespace-nowrap px-4 py-2 font-medium text-white">Status</th>
                                    <th className="whitespace-nowrap px-4 py-2 font-medium text-white"></th>
                                </tr>
                            </thead>

                            <tbody className="divide-y divide-gray-200">
                                {
                                    loading ?  <><tr><td colSpan={5}>
                                        <LoadingComponent />
                                        </td></tr></> : <>
                                    
                                    {
                                        bannerData && bannerData.map((banner: any, index: number) => (
                                            <tr className="odd:bg-gray-50" key={index}>
                                                <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">{banner.title}</td>
                                                <td className="whitespace-nowrap px-4 py-2 text-gray-700">{banner.link}</td>
                                                <td className="whitespace-nowrap px-4 py-2 text-gray-700">{banner.image}</td>
                                                <td className="whitespace-nowrap px-4 py-2 text-gray-700">{banner.status}</td>
                                                <td className="whitespace-nowrap px-4 py-2">
                                                    <TableActionButtons
                                                        editUrl={'/admin/banner/'+banner._id} 
                                                        rowId={banner._id as string}
                                                        deleteAction={deleteBanner}
                                                    />
                                                </td>
                                            </tr>
                                        ))
                                    }
                                    </>
                                }
                            </tbody>
                        </table>
                    </div>
                    {
                        loading ? <></> : <>
                            <PaginationComponent 
                                fetchCall={getBannerList}
                                pagination={pagination}
                            />
                        </>
                    }
                    
                </div>
            </div>
        </section>
    </>)
}

export default AdminBanner;