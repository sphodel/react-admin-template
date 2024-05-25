import { Button } from "antd";
import { useTranslation } from "react-i18next";

const Internation = () => {
  const { t, i18n } = useTranslation();
  const changeLanguage = (lng) => {
    void i18n.changeLanguage(lng);
  };
  return (
    <div className={"flex"}>
      <div className={`flex-1 pl-6 pt-12`}>
        <span className={"text-xl font-bold pr-6"}>{t("切换语言:")}</span>
        <Button onClick={() => changeLanguage("zh")}>中文</Button>
        <Button onClick={() => changeLanguage("en")}>English</Button>
      </div>
    </div>
  );
};
export default Internation;
