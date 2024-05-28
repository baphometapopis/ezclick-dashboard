import React, { useCallback, useEffect, useState } from 'react';
import { calculatePagination } from '../Util/calculatePagination';
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
import BreakinProposalTable from './BreakinProposalTable';
import { getAllProposalListApi } from '../Api/FetchAllProposalList';
import { Search } from '../Constant/ImageConstant';

import './ProposalList.css'
import Dropdown from '../Component/UI/Dropdown';
import { fetchDataLocalStorage } from '../Util/LocalStorage';
import { Anchor } from 'antd';

const  ProposalListPage=()=> {

  const [filterValue,setFilterValue]=useState({
     searchParam:'',productType:'',Status:''
    }
      )
  // breakin_status  -> 0 : pending, 1: inprogress , 2: rejected , 3: referback, 4: completed, 

  const status=[
    {
      "id": 0,
      "label": "Pending"
  },
  {
      "id": 1,
      "label": "InProgress"
  },
  {
      "id": 2,
      "label": "Rejected"
  },
  {
      "id": 3,
      "label": "Refer Back"
  },
  {
    "id": 4,
    "label": "Completed"
},
]
const [windowWidth, setWindowWidth] = useState([window.innerWidth]);

    const [currentPage, setCurrentPage] = useState(1);
    const [totalPage, settotalPage] = useState();
  
    const [filterDrawerVisible, setFilterDrawerVisible] = useState(false);
  
    const handleOpenFilterDrawer = () => {
      setFilterDrawerVisible(true);
    };
  
    const handleCloseFilterDrawer = () => {
      setFilterDrawerVisible(false);
    };
    const [isRefreshButtonDisabled, setIsRefreshButtonDisabled] = useState(false);
  
    const [totalRecords, setTotalRecords] = useState("");
    const [poicyList, setPolicyList] = useState([]);
  
    const [indexOfLastRecord, setIndexOfLastRecord] = useState(10);
    const [indexOfFirstRecord, setIndexOfFirstRecord] = useState(0);
    const recordsPerPage = 10;
    const [isMobile, setisMobile] = useState(false);
  
    const handlePageChange = (pageNumber) => {
      setCurrentPage(pageNumber);
      const pagination = calculatePagination(
        totalRecords,
        recordsPerPage,
        pageNumber
      );
      settotalPage(pagination?.totalPages);
      // setIndexOfFirstRecord()
      setIndexOfFirstRecord(pagination?.startIndex);
      // setIndexOfFirstRecord(pageNumber * recordsPerPage);
    };
  
  
    const refreshpage = () => {};
  
    const handleRefresh = () => {
      // Disable the button
      setIsRefreshButtonDisabled(true);
  
      // GetProposalList();
  
      setTimeout(() => {
        // Enable the button after 10 seconds
        setIsRefreshButtonDisabled(false);
      }, 10000); // 10 seconds in milliseconds
    };
  


    const resetFilter=()=>{
      setFilterValue('')
      GetProposalList();
    }
    const GetProposalList = useCallback(() => {
      const decryptdata=''
      const data = fetchDataLocalStorage('claim_loginDashboard');
   

    
      const listdata = {
        length: filterValue?.length,
       user_id:data?.data?.user_details?.id,
  
        search: filterValue?.searchParam??'',
        start: indexOfFirstRecord,
        end: recordsPerPage,
        product_Type_id: filterValue?.productType??'',
        Status:filterValue?.Status??''
      };
  
      if (indexOfFirstRecord !== indexOfLastRecord) {
        getAllProposalListApi(listdata)
          .then((data) => {
            console.log(data?.data)
            setPolicyList(data?.data);
            setTotalRecords(data?.total_count)
            const pagination = calculatePagination(
              data?.total_count,
              recordsPerPage,
              0
            );
            settotalPage(pagination?.totalPages);
          })
          .catch((error) => {
            console.error(error, "dsdsds");
          });
      }
    }, [filterValue, indexOfFirstRecord, indexOfLastRecord, totalRecords]);
  

    const handleDropdownChange =(e,field)=>{
      const selectedValue=e.target.value;
      setFilterValue(prevData=>({
        ...prevData,[field]:selectedValue
      })) 
    }
    
    // const getSearchValue = (prop) => {
    //   setfilterValue(prop);
    //   // console.log(prop);
    //   GetProposalList();
    // };
  
    useEffect(() => {
      const handleWindowResize = () => {
        setWindowWidth([window.innerWidth]);
      };
  
      window.addEventListener("resize", handleWindowResize);
      if (windowWidth <= 768) {
        setisMobile(false);
      } else {
        setisMobile(true);
      }
      return () => {
        window.removeEventListener("resize", handleWindowResize);
      };
    }, [windowWidth]);
  
    useEffect(() => {
      setIndexOfLastRecord(currentPage * recordsPerPage);
    }, [currentPage, recordsPerPage, totalPage]);
  
    useEffect(() => {
      GetProposalList();
    }, [indexOfLastRecord, indexOfFirstRecord]);
  

const product=[
  {
      "id": 1,
      "label": "Private Car"
  },
  {
      "id": 2,
      "label": "Two Wheeler"
  },
  {
      "id": 3,
      "label": "Commercial"
  },
  {
      "id": 4,
      "label": "Taxi (1-6)"
  },
  {
      "id": 5,
      "label": "Threewheeler"
  },
  {
      "id": 7,
      "label": "Bus PCCV"
  },
  {
      "id": 8,
      "label": "Threewheeler"
  },
  {
      "id": 9,
      "label": "Misc D"
  },
  {
      "id": 10,
      "label": "3 wheeler (GCCV)"
  },
  {
      "id": 11,
      "label": "3 wheeler(PCCV) 6-17 Seater"
  },
  {
      "id": 12,
      "label": "Rickshow(PCCV) 3-6 Seater"
  },
  {
      "id": 13,
      "label": "Ecart Rickshow(GCCV)"
  },
  {
      "id": 14,
      "label": "Ecart rickshow(PCCV)"
  }
]
const handleSearchChange = (event) => {
  
  setFilterValue(prevData=>({
    ...prevData,searchParam:event.target.value
  }))
};

useEffect(()=>{},[filterValue])

    return (
      <div style={{height:'100%'}}>
      
     
        {/* <div className=" flex justify-center w-full p-8 mx md:w-[75%] max-w-[95%] bg-white lg:max-h-80 min-h-fit -mt-20 border border-neutral-light rounded mb-4 ">
          <LineChart />
        </div> */}
  <div className='filter-container'>
  <div className="search-bar1">
        <input
          type="text"
          placeholder="Search Proposal No  ,Vehicle No..."
          value={filterValue?.search}
          onChange={handleSearchChange} // Update search keyword as user types
        /> 


        
        {/* <img
          className="image"
          src={Search}
          alt="Search"
          style={{ height: "35px", width: "35px", paddingLeft: "12px", cursor: "pointer" }}
          // onClick={handleSearchSubmit} // Handle search submission on click
        /> */}


      </div>
      <div style={{backgroundColor:'white',height:"50px",display:'flex',flexDirection:'row',justifyContent:'center'}}>
<div style={{width:'95%',display:'flex',flexDirection:'row',gap:"10px"}}>
      <Dropdown
          // label="Vehicle Fuel Type"
          // required={true}
          // value={formData.v_fuel_type_id}

          onChange={(event) => handleDropdownChange(event, 'productType')}
          options={product.map((product) => ({
            value: product?.id,
            label: product?.label
          }))}

          placeholder="Select Product Type"
        />

<Dropdown
          // label="Vehicle Fuel Type"
          // required={true}
          // value={formData.v_fuel_type_id}

          onChange={(event) => handleDropdownChange(event, 'Status')}
          options={status.map((product) => ({
            value: product?.id,
            label: product?.label
          }))}

          placeholder="Select Status"
          // error={formErrors.v_fuel_type_id}
        />
         <button onClick={GetProposalList} className="submit-button" >Submit</button>
        <button className="reset-button" onClick={resetFilter} style={{backgroundColor:'red'}} >Reset</button>
        </div>
        </div>
      </div>
            <div className="flex gap-5">
              <h1 className="text-2xl font-bold mb-4">Breakin Proposal</h1>
              {/* {!isMobile && (
                <img
                  src={IconFilter}
                  className="w-[35px]  h-[30px]"
                  alt="search_image"
                  onClick={handleOpenFilterDrawer}
                />
              )} */}
              <Tippy
                content={
                  isRefreshButtonDisabled ? "wait 10 sec " : "Refresh Files"
                }
                placement="right"
                arrow={true}
                className="rounded-sm text-xs"
              >
                {/* <img
                  src={Refresh}
                  className={`w-[35px] h-[30px]   ${
                    isRefreshButtonDisabled
                      ? "cursor-not-allowed animate-spin-slow"
                      : "cursor-pointer"
                  } ${isRefreshButtonDisabled ? "opacity-50" : ""}`}
                  alt="search_image"
                  onClick={() => !isRefreshButtonDisabled && handleRefresh()}
                /> */}
              </Tippy>
            </div>
            {/* <FilterDrawer
              visible={filterDrawerVisible}
              onClose={handleCloseFilterDrawer}
            /> */}
  
            {/* {isMobile && (
              <SearchContainer
                getSearchValue={getSearchValue}
                searchType={"policy"}
              />
            )} */}
            {/* {isMobile ? ( */}
            <BreakinProposalTable data={poicyList} refresh={refreshpage} />
  
            <div style={{display:'flex',justifyContent:'space-between',marginRight:'10px',alignItems:'center'}}>
              <span style={{color:'black'}}>
                Showing {indexOfFirstRecord + 1} to {indexOfFirstRecord + 10} of{" "}
                {totalRecords} entries
              </span>
              <div style={{display:'flex',gap:'10px',alignItems:'center'}}>
              <span style={{color:'black'}}>
                  Page {currentPage} of {totalPage}
                </span>
  
                <button
  className='paginationbutton'
onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  Prev
                </button>
                <button
                  className='paginationbutton'
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPage}
                >
                  Next
                </button>
              </div>
            </div>
       
      </div>
    );
  }

export default ProposalListPage;
