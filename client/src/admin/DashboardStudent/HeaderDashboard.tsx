import bellIcon from "../../assets/icon/bell.png"

export default function HeaderDashboard() {
  return (
    <div className="flex items-center justify-between px-6 py-4 border-b">
      <div>
        <h1 className="text-2xl font-bold">Dashboard Overview</h1>
        <p className="text-sm text-gray-500">Welcome back Admin</p>
      </div>
      <div className="flex items-center gap-5">
        <div>
            <img src={bellIcon} alt="" className="w-8"/>
        </div>
        <div>
          <img src="https://i.pinimg.com/1200x/e6/34/d3/e634d384fb0c31d7245d70d6f70f830d.jpg" alt="avt" className="rounded-full w-12"/>
        </div>
      </div>
    </div>
  );
}
