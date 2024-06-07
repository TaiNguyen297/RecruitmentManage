/* eslint-disable import/no-anonymous-default-export */
import mailTemplate from "../template";
// TODO: Dùng sau khi xác nhận NHẬN QUA vòng phỏng vấn

export default (data: any) => {
  const content = `
    Thân gửi bạn ${data.fullName}!<br>
    <br>
    Khoảng Trời Của Bé chào bạn! Chúng mình rất ấn tượng với năng lượng và tình yêu dành cho tình nguyện của bạn. Chúng mình tin rằng, với năng lực và tinh thần nhiệt huyết đó, bạn sẽ cùng chúng mình cống hiến thật nhiều trong các hoạt động và công tác tình nguyện của Khoảng Trời Của Bé.<br>
    CHÚC MỪNG BẠN ĐÃ CHÍNH THỨC TRỞ THÀNH MỘT MÀNH GHÉP TRONG GIA ĐÌNH KHOẢNG TRỜI CỦA BÉ.<br>
    <br>
    Chúng mình sẽ có buổi gặp mặt trong thời gian tới, cụ thể như sau:<br>
    - Thời gian: Từ <TỪ GIỜ> đến <ĐẾN GIỜ>, <THỨ>, ngày <NGÀY>/<THÁNG>/<NĂM>.<br>
    - Địa điểm: <ĐỊA CHỈ><LINK GOOGLE MAP><br>
    - Liên hệ tiếp đón: <SỐ ĐIỆN THOẠI THÀNH VIÊN TIẾP ĐÓN> <TÊN THÀNH VIÊN TIẾP ĐÓN><br>
    <br>
    Bạn vui lòng xác nhận tham gia buổi gặp mặt qua email này để chúng mình có sự chuẩn bị tiếp đón bạn tốt nhất nhé. Hẹn gặp lại bạn!<br>
    <br>
    Thân mến!<br>
    Khoảng Trời Của Bé<br>
  `;

  return mailTemplate(content);
};
