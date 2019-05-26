using System;
using System.Diagnostics;
using System.Reflection;
using System.Runtime.InteropServices;
using System.Text;
using System.Windows;

namespace SachCaLoginHelper.Helper
{
    class Win32Helper
    {
        [DllImport("user32.dll", EntryPoint = "FindWindow", SetLastError = true)]
        private static extern IntPtr FindWindow(string lpClassName, string lpWindowName);

        [DllImport("user32.dll", EntryPoint = "FindWindowEx", SetLastError = true)]
        private static extern IntPtr FindWindowEx(IntPtr hwndParent, uint hwndChildAfter, string lpszClass, string lpszWindow);

        [DllImport("user32.dll", EntryPoint = "SendMessage", SetLastError = true, CharSet = CharSet.Auto)]
        private static extern int SendMessage(IntPtr hwnd, uint wMsg, int wParam, int lParam);

        [DllImport("user32.dll")]
        private static extern int ShowWindow(IntPtr hwnd, int command);
        [DllImport("user32")]
        public static extern int EnumWindows(CallBack x, int y);
        [DllImport("user32.dll")]
        private static extern int GetWindowTextW(IntPtr hWnd, [MarshalAs(UnmanagedType.LPWStr)]StringBuilder lpString, int nMaxCount);
        [DllImport("user32.dll")]
        private static extern int GetClassNameW(IntPtr hWnd, [MarshalAs(UnmanagedType.LPWStr)]StringBuilder lpString, int nMaxCount);
        /// 该函数设置由不同线程产生的窗口的显示状态
        /// </summary>
        /// <param name="hWnd">窗口句柄</param>
        /// <param name="cmdShow">指定窗口如何显示。查看允许值列表，请查阅ShowWlndow函数的说明部分</param>
        /// <returns>如果函数原来可见，返回值为非零；如果函数原来被隐藏，返回值为零</returns>
        [DllImport("User32.dll")]
        private static extern bool ShowWindowAsync(IntPtr hWnd, int cmdShow);
        /// <summary>
        ///  该函数将创建指定窗口的线程设置到前台，并且激活该窗口。键盘输入转向该窗口，并为用户改各种可视的记号。
        ///  系统给创建前台窗口的线程分配的权限稍高于其他线程。 
        /// </summary>
        /// <param name="hWnd">将被激活并被调入前台的窗口句柄</param>
        /// <returns>如果窗口设入了前台，返回值为非零；如果窗口未被设入前台，返回值为零</returns>
        [DllImport("User32.dll", EntryPoint = "SetForegroundWindow", SetLastError = true)]
        private static extern bool SetForegroundWindow(IntPtr hWnd);

        public delegate bool CallBack(int hwnd, int lParam);
        private const int Sw_Hide = 0;
        private const int Sw_Show = 1;
        protected static IntPtr Handle
        {
            get
            {
                return FindWindow(null, "Syncios Data Recovery");
            }
        }



        private void toolStripButton1_Click(object sender, EventArgs e)
        {
            ShowWindow(Handle, Sw_Hide);
        }

        private void toolStripButton2_Click(object sender, EventArgs e)
        {
            ShowWindow(Handle, Sw_Show);
        }
        public static void test()
        {
            //ShowWindow(Handle, Sw_Show);
            CallBack myCallBack = new CallBack(Recall);
            EnumWindows(myCallBack, 0);
        }
        public static bool Recall(int hwnd, int lParam)
        {
            StringBuilder sb = new StringBuilder(256);
            IntPtr PW = new IntPtr(hwnd);

            GetWindowTextW(PW, sb, sb.Capacity); //得到窗口名并保存在strName中
            string strName = sb.ToString();

            GetClassNameW(PW, sb, sb.Capacity); //得到窗口类名并保存在strClass中
            string strClass = sb.ToString();
            MessageBox.Show(strName + "  " + strClass);
            if (strName.IndexOf("窗口名关键字") >= 0 && strClass.IndexOf("类名关键字") >= 0)
            {
                return false; //返回false中止EnumWindows遍历
            }
            else
            {
                return true; //返回true继续EnumWindows遍历
            }
        }
        private const int SW_SHOWNOMAL = 1;
        public static void HandleRunningInstance(Process instance)
        {
            ShowWindowAsync(instance.MainWindowHandle, SW_SHOWNOMAL);//显示
            SetForegroundWindow(instance.MainWindowHandle);//当到最前端
        }
        public static Process RuningInstance()
        {
            Process currentProcess = Process.GetCurrentProcess();
            Process[] Processes = Process.GetProcessesByName(currentProcess.ProcessName);
            foreach (Process process in Processes)
            {
                if (process.Id != currentProcess.Id)
                {
                    if (Assembly.GetExecutingAssembly().Location.Replace("/", "\\") == currentProcess.MainModule.FileName)
                    {
                        return process;
                    }
                }
            }
            return null;
        }
    }
}
