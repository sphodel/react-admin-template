import React, { useState } from "react";
import {
  Button,
  Modal,
  Form,
  Input,
  InputNumber,
  Space,
  Table,
  message,
} from "antd";
interface DataType {
  key: string;
  name: string;
  age: number;
  address: string;
}

const initialData: DataType[] = [
  {
    key: "1",
    name: "John Brown",
    age: 32,
    address: "New York No. 1 Lake Park",
  },
  { key: "2", name: "Jim Green", age: 42, address: "London No. 1 Lake Park" },
  { key: "3", name: "Joe Black", age: 32, address: "Sidney No. 1 Lake Park" },
];

const Tables: React.FC = () => {
  const [data, setData] = useState<DataType[]>(initialData);
  const [editingKey, setEditingKey] = useState<string | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [messageApi, contextHolder] = message.useMessage();
  const [name, setName] = useState("");
  const edit = (record: Partial<DataType>) => {
    form.setFieldsValue({ name: "", age: "", address: "", ...record });
    setEditingKey(record.key || "");
    setIsModalVisible(true);
  };

  const save = async () => {
    try {
      const row = (await form.validateFields()) as DataType;
      const newData = [...data];
      const index = newData.findIndex((item) => editingKey === item.key);
      if (index > -1) {
        newData[index] = { ...newData[index], ...row };
      } else {
        newData.push(row);
      }
      if (editingKey) {
        void messageApi.open({
          type: "success",
          content: "修改成功",
        });
      } else {
        void messageApi.open({
          type: "success",
          content: "添加成功",
        });
      }
      setData(newData);
      setEditingKey(null);
      setIsModalVisible(false);
    } catch (errInfo) {
      console.log("Validate Failed:", errInfo);
    }
  };

  const handleDelete = (key: React.Key) => {
    void messageApi.open({
      type: "success",
      content: "删除成功",
    });
    setData(data.filter((item) => item.key !== key));
  };

  const addNew = () => {
    form.resetFields();
    setEditingKey("");
    setIsModalVisible(true);
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Age",
      dataIndex: "age",
      key: "age",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Action",
      key: "action",
      render: (record: DataType) => (
        <Space size="middle">
          <Button type="link" onClick={() => edit(record)}>
            修改
          </Button>
          <Button type="link" danger onClick={() => handleDelete(record.key)}>
            删除
          </Button>
        </Space>
      ),
    },
  ];
  const filteredData = data.filter((item) => {
    return item.name.toLowerCase().includes(name.toLowerCase());
  });

  return (
    <div>
      {contextHolder}
      <Button type="primary" onClick={addNew} style={{ marginBottom: 16 }}>
        添加
      </Button>
      <Input
        className={"w-1/3 ml-10"}
        placeholder={"查找姓名"}
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <Table columns={columns} dataSource={filteredData} rowKey="key" />
      <Modal
        visible={isModalVisible}
        title={editingKey ? "修改信息" : "添加新信息"}
        onCancel={() => setIsModalVisible(false)}
        onOk={save}
      >
        <Form form={form} layout="vertical" name="form_in_modal">
          <Form.Item
            name="name"
            label="姓名"
            rules={[{ required: true, message: "Please input the name!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="age"
            label="年龄"
            rules={[{ required: true, message: "Please input the age!" }]}
          >
            <InputNumber min={0} />
          </Form.Item>
          <Form.Item
            name="address"
            label="地址"
            rules={[{ required: true, message: "Please input the address!" }]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Tables;
