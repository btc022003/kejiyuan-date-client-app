import { Button, DatePicker, Form, NavBar, Selector, Toast } from "antd-mobile";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import dayjs from "dayjs";
import { addToDateAPI, loadUserFamiliesAPI } from "../../services/api";

function ToDatePage() {
  const [isShowDatePicker, setIsShowDatePicker] = useState<boolean>(false);
  const [txtDate, setTxtDate] = useState("请选择参观日期");
  const [families, setFamilies] = useState<IUserFamily[]>([]);
  useEffect(() => {
    loadUserFamiliesAPI().then((res) => {
      setFamilies(res.data); // 获取家庭成员信息
    });
  }, []);
  const navigate = useNavigate();
  return (
    <div className="m-page">
      <NavBar
        onBack={() => {
          navigate(-1);
        }}
      >
        预约
      </NavBar>
      <Form
        onFinish={async (v) => {
          // console.log(v);
          if (v.dateFamilies && v.dateFamilies.length > 0) {
            // console.log(v);
            await addToDateAPI({
              date: txtDate,
              dateFamilies: v.dateFamilies,
            });
            Toast.show("预约成功");
            navigate("/user/date");
          } else {
            Toast.show("请选择参访人");
            return;
          }
        }}
      >
        <Form.Item label="预约时间">
          <span
            onClick={() => {
              setIsShowDatePicker(true);
            }}
          >
            {txtDate}
          </span>
          <DatePicker
            visible={isShowDatePicker}
            precision="minute"
            onCancel={() => {
              setIsShowDatePicker(false);
            }}
            onConfirm={(v) => {
              // console.log(v);
              // dayjs
              setTxtDate(dayjs(v).format("YYYY-MM-DD HH:mm:ss"));
              setIsShowDatePicker(false);
            }}
          />
        </Form.Item>
        <Form.Item label="参观人" name="dateFamilies">
          <Selector
            options={families.map((item) => {
              return {
                label: item.realName,
                value: item.id,
              };
            })}
            // defaultValue={['2', '3']}
            multiple
            // onChange={(arr, extend) => console.log(arr, extend.items)}
          />
        </Form.Item>
        <Form.Item>
          <Button type="submit">预约</Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default ToDatePage;
