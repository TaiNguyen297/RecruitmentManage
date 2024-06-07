/* eslint-disable import/no-anonymous-default-export */
import mailTemplate from "../template";
// TODO: Dùng sau khi xác nhận NHẬN QUA vòng đơn

export default (data: any) => {
  const content = `
    Thân gửi bạn ${data.fullName}!<br>
    <br>
    Khoảng Trời Của Bé chào bạn! Lời đầu tiên, chúng mình xin chân thành cảm ơn sự quan tâm của bạn đến hoạt động tình nguyện vì trẻ em và đăng ký tham gia trở thành thành viên của Khoảng Trời Của Bé.<br>
    <br>
    Để chúng mình có thể hiểu rõ hơn về nhau, mời bạn tham gia buổi phỏng vấn theo lịch trình cụ thể như sau:<br>
    - Thời gian: Từ <TỪ GIỜ> đến <ĐẾN GIỜ>, <THỨ>, ngày <NGÀY>/<THÁNG>/<NĂM>.<br>
    - Địa điểm: <LINK GOOGLE MEET><br>
    - Nền tảng: Google Meet<br>
    <br>
    Bạn vui lòng xác nhận tham gia (hoặc không tham gia) buổi phỏng vấn qua email này. Trong trường hợp bạn muốn thay đổi thời gian phỏng vấn hãy cứ phản hồi lại cho chúng mình qua email hoặc hotline <SỐ ĐIỆN THOẠI TRỰC> (gặp <TÊN THÀNH VIÊN TRỰC>) để được hỗ trợ.<br>
    <br>
    Thân mến!<br>
    Khoảng Trời Của Bé<br>
  `;

  return mailTemplate(content);
};
