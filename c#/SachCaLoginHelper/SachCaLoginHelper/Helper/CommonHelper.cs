using System;
using System.Diagnostics;
using System.IO;
using System.Reflection;
using System.Windows.Forms;
using System.Windows.Media;
using System.Windows.Media.Imaging;

namespace SachCaLoginHelper.Helper
{
    class CommonHelper
    {
        public static void CheckApplicationRunning()
        {
            Process process = Win32Helper.RuningInstance();
            if (process != null)
            {
                MessageBox.Show("应用程序已经在运行中。。。");
                //Controls.HandleRunningInstance(process);
                CommonHelper.Delay(1000);
                System.Windows.Application.Current.Shutdown();
                return;
            }
        }
        public static void Delay(int milliSecond)
        {
            int start = Environment.TickCount;
            while (Math.Abs(Environment.TickCount - start) < milliSecond)
            {
                Application.DoEvents();
            }
        }
        public static NotifyIcon GlobalNotifyIcon;
        public static ImageSource GetAssemblyImage(string _path)
        {
            try
            {
                String projectName = Assembly.GetExecutingAssembly().GetName().Name.ToString();
                Stream stream = Assembly.GetExecutingAssembly().GetManifestResourceStream(projectName + ".Assets." + _path);
                ImageSourceConverter imageSourceConverter = new ImageSourceConverter();
                ImageSource imageSource = (ImageSource)imageSourceConverter.ConvertFrom(stream);
                stream.Close();
                return imageSource;
            }
            catch (Exception)
            {
                return new BitmapImage();
            }
        }
        public static Assembly GetAssemblyDll(string _path)
        {
            String projectName = Assembly.GetExecutingAssembly().GetName().Name.ToString();
            Stream stream = Assembly.GetExecutingAssembly().GetManifestResourceStream(projectName + ".Assets." + _path);
            byte[] assemblyData = new byte[stream.Length];
            stream.Read(assemblyData, 0, assemblyData.Length);
            return Assembly.Load(assemblyData);
        }
        public static bool IsIntergerOrLetter(string content)
        {
            System.Text.RegularExpressions.Regex reg = new System.Text.RegularExpressions.Regex(@"^[A-Za-z0-9]+$");
            return reg.IsMatch(content);
        }

        /// <summary>
        /// 根据 模糊进程名 结束进程
        /// </summary>
        /// <param name="strProcName">模糊进程名</param>
        public static void KillProcA(string strProcName)
        {
            try
            {
                //模糊进程名  枚举
                //Process[] ps = Process.GetProcesses();  //进程集合
                foreach (Process p in Process.GetProcesses())
                {
                    Console.WriteLine(p.ProcessName + p.Id);
                    //MessageBox.Show(p.ProcessName);
                    if (p.ProcessName.IndexOf(strProcName, StringComparison.CurrentCultureIgnoreCase) > -1)  //第一个字符匹配的话为0，这与VB不同
                    {
                        if (!p.CloseMainWindow())
                        {
                            p.Kill();
                        }
                    }
                }
            }
            catch
            {

            }
        }
    }
}
