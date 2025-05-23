import {Button} from "@chakra-ui/react";
import Api from "@/config/Api.ts";

const index = () => {


  const testApi = () => {
    Api.get('/auth/test')
      .then((r) => {
        console.log(r);
      })
      .catch((err) => {
        console.log(err);
      })
  }

  return (
    <>
      <div>
        테스트 페이지 인가인증접속
      </div>

      <Button
        onClick={testApi}
      >
        test
      </Button>
    </>
  );
};

export default index;
