import "./contractInformation.css";
import {
  Button,
  DatePicker,
  message,
  Table,
  TableColumnsType,
  Upload,
  UploadProps,
} from "antd";
import { DeleteOutlined, UploadOutlined } from "@ant-design/icons";

interface DataType {
  id: string | number;
  name: string;
  created_at: string;
}
const ContractInformation = () => {
  // const [tableData, setTableData] = useState<DataType[]>([]);

  const props: UploadProps = {
    name: "file",
    accept: "image/*,.pdf,.csv,.xlsx,.docx",
    multiple: true,
    action: "https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188",
    headers: {
      authorization: "authorization-text",
    },
    showUploadList: false,
    onChange(info) {
      if (info.file && info.file.status === "done") {
        message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };

  const columns: TableColumnsType<DataType> = [
    {
      title: "No",
      dataIndex: "id",
      key: "id",
      className: "addnew__other-column",
      render: (_, __, index) => (
        <span style={{ textAlign: "center" }}>{++index}</span>
      ),
    },
    {
      title: "Contract Name",
      dataIndex: "contract_name",
      key: "contract_name",
      className: "addnew__other-column",
    },
    {
      title: "Sign Date",
      dataIndex: "sign_date",
      key: "sign_date",
      className: "addnew__other-column",
    },
    {
      title: "Action",
      dataIndex: "",
      key: "x",
      render: (record) => (
        <a className="addnew__other-delete" onClick={() => console.log(record)}>
          <DeleteOutlined /> Delete
        </a>
      ),
      className: "addnew__other-column",
    },
  ];

  return (
    <div className="addnew-container">
      <div className="addnew__header">
        <h2 className="addnew__header-heading">Contract Information</h2>
        <p className="addnew__header-desc">
          Required (<span className="required">*</span>)
        </p>
      </div>
      <div className="addnew__header-line"></div>
      <div className="addnew__contract">
        <div className="addnew__contract-input-box">
          <label htmlFor="" className="addnew__contract-label">
            Date Start
            <span className="required">*</span>
          </label>
          <div className="addnew__contract-input-wrapper">
            <DatePicker id="" name="" className="addnew__contract-date-box" />
          </div>
        </div>

        <div className="addnew__contract-input-box">
          <label htmlFor="type" className="addnew__contract-label">
            Employee Type<span className="required">*</span>
          </label>
          <div className="addnew__contract-input-wrapper">
            <select id="type" name="type" className="addnew__contract-select">
              <option value="" hidden>
                Choose Employee Type
              </option>
              <option value="0">Permanent worker</option>
              <option value="1">Part-time worker</option>
              <option value="2">Contract worker</option>
            </select>
          </div>
        </div>

        <label className="addnew__contract-label">Contract</label>

        <div>
          <div className="addnew__contract-input-box">
            <label htmlFor="" className="addnew__contract-label">
              Contract Date From:
            </label>
            <div className="addnew__contract-input-wrapper">
              <DatePicker id="" name="" className="addnew__contract-date-box" />
            </div>

            <label htmlFor="" className="addnew__contract-label">
              to:
            </label>
            <div className="addnew__contract-input-wrapper">
              <DatePicker id="" name="" className="addnew__contract-date-box" />
            </div>
          </div>
        </div>

        <label className="addnew__contract-label">Extension Contract</label>

        <div>
          <div className="addnew__contract-input-box">
            <label htmlFor="" className="addnew__contract-label">
              Contract Date From:
            </label>
            <div className="addnew__contract-input-wrapper">
              <DatePicker id="" name="" className="addnew__contract-date-box" />
            </div>

            <label htmlFor="" className="addnew__contract-label">
              to:
            </label>
            <div className="addnew__contract-input-wrapper">
              <DatePicker id="" name="" className="addnew__contract-date-box" />
            </div>
          </div>
        </div>
      </div>

      <div className="addnew__contract-frame">
        <div className="addnew__contract-head">
          <div className="addnew__contract-title">CONTRACT:</div>
        </div>
        <div className="addnew__contract-desc">
          Please upload pdf, png, xlsx, docx file format!
        </div>
        <div className="addnew__contract-line"></div>

        <div className="addnew__contract-upload">
          <div className="addnew__contract-upload-box">
            <div>
              <div className="addnew__contract-input-box">
                <label htmlFor="" className="addnew__contract-label">
                  Contract Date
                </label>
                <div className="addnew__contract-input-wrapper">
                  <DatePicker
                    id=""
                    name=""
                    className="addnew__contract-date-box"
                  />
                </div>
              </div>

              <div className="addnew__contract-input-box">
                <label htmlFor="" className="addnew__contract-label">
                  Contract Name
                </label>
                <div className="addnew__contract-input-wrapper">
                  <input
                    id=""
                    name=""
                    type="text"
                    className="addnew__employee-input"
                  />
                </div>
              </div>
            </div>

            <div className="addnew__contract-action">
              <Upload {...props}>
                <Button
                  className="addnew__contract-upload-btn"
                  icon={<UploadOutlined />}
                >
                  Upload
                </Button>
              </Upload>
              <Button className="addnew__contract-btn">Add</Button>
            </div>
          </div>

          <Table
            size="small"
            columns={columns}
            // dataSource={tableData}
            pagination={false}
            className="addnew__contract-table"
          />
        </div>
      </div>
    </div>
  );
};

export default ContractInformation;
