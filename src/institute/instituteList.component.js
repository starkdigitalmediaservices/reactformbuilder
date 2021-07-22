import React, { useState, useEffect } from 'react';
import CustomTable from 'stark-custom-datatable';
import swal from 'sweetalert';
import { Card, Button, Image } from 'react-bootstrap';
import AuthApi from '../components/StarkFormBuilder/helper/authApi';
import Api from '../components/StarkFormBuilder/helper/api';
import Breadcrumb from '../components/Breadcrumb/breadcrumb.component';
import customFunctions from '../components/StarkFormBuilder/helper/customFunctions';
import AddNewInstitutecomponent from './addNewInstitute';

const InstituteComponent = () => {
  // Declare variable 
  const [rowData, setRowData] = useState([]);
  const [totalCount, setTotalCount] = useState(10);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(0);
  const [filterData, setFilterData] = useState({}) // eslint-disable-line
  const [instituteId, setInstituteId] = useState(null) // eslint-disable-line
  const [modalShow, setModalShow] = useState(false);
  const title = 'All Institutes';
  const items = [
    { to: '/', label: 'Home' },
    { to: '/institute/list', label: 'All Institute' },
  ];
  console.log('instituteId', instituteId);
  const getParentsData = async () => {
    getRowData(1);
  };

  const handleActionCallback = (row) => { // eslint-disable-line
    return (
      <>
        <a
          href='/'
          className='p-r-2 l-m-10'
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setInstituteId(row.id);
            setModalShow(true);
          }}
        >
          <Image src="/images/edit-button.svg" alt="Edit Company" />
        </a>
        <a
          href='/'
          className='p-r-2 l-m-10'
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            deleteInstitute(row.id)
          }}
        >
          <Image src="/images/delete.png" alt="Delete Company" />
        </a>
      </>
    );
  };
  // Declare columns
  const columns = [{
    'id': 'id',
    'label': 'Index',
  },
  {
    'id': 'name',
    'label': 'Institute Name',
  },
  {
    id: 'action',
    label: 'Action',
    roleAccess: [1, 2],
    render: handleActionCallback
  },
  ];
  // Declare methods
  const getRowData = async (pageNo = 1) => {
    const page = pageNo || currentPage;
    const endPoint = `${Api.getAllInstitute}`;
    const filterList = filterData && !customFunctions.checkIfEmpty(filterData, 'O') ? customFunctions.jsonParse(filterData) : {};
    const params = {
      offset: page - 1,
      limit: itemsPerPage,
      ...filterList
    };
    const url = customFunctions.generateUrl(endPoint, params);
    const { data, message } = await AuthApi.getDataFromServer(url);
    if (!data) return;
    if (!customFunctions.checkIfEmpty(data, 'O') && data && data.data.length > 0 && data.success) {
      setTotalCount(data.paginator.totalCount);
      setItemsPerPage(data.paginator.limit);
      setCurrentPage(Number(data.paginator.currentPage + 1));
      setRowData(data && data.data || []);
    }
    else {
      swal(message, '', 'error');
    }
  };

  useEffect(() => {
    getRowData(1);
  }, [filterData]);

  const handleBulkDelete = async (selectedIds) => {
    if (!customFunctions.checkIfEmpty(selectedIds, 'A')) {
      let endpoint = 'https://51qef5wvnk.execute-api.ap-south-1.amazonaws.com/dev/institute/findAllInstitutes/0/10/';
      let apiMethod = 'delete';
      const params = {};
      if (selectedIds.length > 1) {
        params.id = selectedIds;
        apiMethod = 'post';
      } else {
        endpoint += selectedIds[0] + '/' // eslint-disable-line
      }
      const successHandle = (e => console.log(e));
      const errorHandle = (e => console.log(e));
      await customFunctions.deleteBulkRecord(endpoint, params, apiMethod, successHandle, errorHandle);
    }
  };

  const deleteInstitute = (id) => {
    if (id) {
      swal({
        title: 'Are you sure?',
        text: 'Are you sure that you want to delete the employee?',
        icon: 'warning',
        dangerMode: true,
        buttons: true,
        closeOnClickOutside: false,
        allowOutsideClick: false,
      }).then(async (result) => {
        if (result) {

          const { data, message } = await AuthApi.deleteDataFromServer(Api.deleteInstitute, id);
          if (data) {
            swal(data && data.message[0], '', 'success', {
              closeOnClickOutside: false,
              allowOutsideClick: false,
              buttons: false,
              timer: 2000,
            }).then(() => {
              swal.close();
              getRowData(1);
            });
          } else {
            swal(message, '', 'error', {
              closeOnClickOutside: false,
              allowOutsideClick: false,
            });
          }
        }
      });
    }
  };

  return (
    <>
      <div className="page-header">
        <div className="title-breadcrumb-section">
          <h2 className="main-content-title tx-24 mg-b-5">{title}</h2>
          <Breadcrumb items={items} />
        </div>
      </div>
      <Card className="mt-1">
        <Card.Header>
          <Button
            className="right"
            onClick={() => {
              setModalShow(true);
              setInstituteId(null);
            }}>
            Add Institute
          </Button>
        </Card.Header>
        <Card.Body>
          <CustomTable
            columns={columns}
            rows={rowData}
            bulkActionsLabel='Apply'
            bulkActions={[{ 'actionTitle': 'Delete', 'actionCallback': handleBulkDelete },]}
            showPagination
            paginationProps={{
              totalItems: totalCount,
              itemsPerPage,
              activePage: currentPage,
              onPageChange: (pageNo) => {
                getRowData(pageNo);
              }
            }}
            showCheckbox
            emptyRender={() => { return ('No record found.'); }}
          />
        </Card.Body>
      </Card>
      {
        modalShow && (
          <AddNewInstitutecomponent
            show={modalShow}
            instituteId={instituteId ? instituteId : null} //eslint-disable-line
            handleModalCLose={(e) => setModalShow(e)}
            onChanges={() => {
              getParentsData();
            }}
          />
        )
      }
    </>
  );
};

export default InstituteComponent;
