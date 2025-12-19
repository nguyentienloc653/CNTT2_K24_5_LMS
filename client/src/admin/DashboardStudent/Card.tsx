import studentTotalIcon from "../../assets/icon/totalStudent.png";
import courseTotalIcon from "../../assets/icon/courseTheme.png";
import classTotalIcon from "../../assets/icon/classTheme.png";

export default function Card() {
  return (
    <div className="flex flex-col">
      <div className="grid grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-xl shadow border hover:shadow-lg">
          <div className="flex items-center justify-between">
            <img src={studentTotalIcon} alt="Total Student" className="w-8" />
            <p className="text-gray-500 text-sm">Students</p>
          </div>
          <p className="text-2xl font-bold mt-2">1,240</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow border hover:shadow-lg">
          <div className="flex items-center justify-between">
            <img src={studentTotalIcon} alt="Total Student" className="w-8" />
            <p className="text-gray-500 text-sm">Teachers</p>
          </div>
          <p className="text-2xl font-bold mt-2">42</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow border hover:shadow-lg">
          <div className="flex items-center justify-between">
            <img src={courseTotalIcon} alt="Total Student" className="w-8" />
            <p className="text-gray-500 text-sm">Courses</p>
          </div>
          <p className="text-2xl font-bold mt-2">18</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow border hover:shadow-lg">
          <div className="flex items-center justify-between">
            <img src={classTotalIcon} alt="Total Student" className="w-8" />
            <p className="text-gray-500 text-sm">Classes</p>
          </div>
          <p className="text-2xl font-bold mt-2">36</p>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-6 mt-10">
        <div className="bg-white p-6 rounded-xl shadow border hover:shadow-lg">
          <h2 className="mb-4 font-bold">Recent Activity</h2>
          <div className="flex items-center gap-2 mb-4">
            <img
              src="https://i.pinimg.com/1200x/e6/34/d3/e634d384fb0c31d7245d70d6f70f830d.jpg"
              alt="avt"
              className="w-10 rounded-full"
            />
            <p className="font-semibold">A vừa nộp bài tập</p>
          </div>
          <div className="flex items-center gap-2 mb-4">
            <img
              src="https://i.pinimg.com/1200x/e6/34/d3/e634d384fb0c31d7245d70d6f70f830d.jpg"
              alt="avt"
              className="w-10 rounded-full"
            />
            <p className="font-semibold">A vừa nộp bài tập</p>
          </div>
          <div className="flex items-center gap-2 mb-4">
            <img
              src="https://i.pinimg.com/1200x/e6/34/d3/e634d384fb0c31d7245d70d6f70f830d.jpg"
              alt="avt"
              className="w-10 rounded-full"
            />
            <p className="font-semibold">A vừa nộp bài tập</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow border hover:shadow-lg">
          <h2 className="mb-4 font-bold">Today's Schedule</h2>
          <div className="flex gap-8 items-center">
            <span>
                <p>09:00</p>
                <p className="text-gray-500 pl-2">AM</p>
            </span>
            <span className="bg-blue-200 rounded-md p-2 w-11/12">
                <p>Lập trình C - Lớp CNTT1</p>
                <p className="text-gray-500" >Phòng: Thực tiễn</p>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
