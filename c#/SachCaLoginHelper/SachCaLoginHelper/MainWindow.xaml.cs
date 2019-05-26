using SachCaLoginHelper.Helper;
using System.Diagnostics;
using System.IO;
using System.Threading;
using System.Windows;
using System.Windows.Input;
using System.Windows.Threading;

namespace SachCaLoginHelper
{
    /// <summary>
    /// MainWindow.xaml 的交互逻辑
    /// </summary>
    public partial class MainWindow : Window
    {
        public MainWindow()
        {
            InitializeComponent();
            Init();
        }
        private void Init()
        {

            CommonHelper.CheckApplicationRunning();
            InstallWebImage.Source = CommonHelper.GetAssemblyImage("Images.browser.png");
            InstallUsbKeyImage.Source = CommonHelper.GetAssemblyImage("Images.usb.png");
            InstallUsbKey2Image.Source = CommonHelper.GetAssemblyImage("Images.padlock.png");
            InstallAppImage.Source = CommonHelper.GetAssemblyImage("Images.loading.png");
            InstallArrow1.Source = CommonHelper.GetAssemblyImage("Images.arrow.png");
            InstallArrow2.Source = CommonHelper.GetAssemblyImage("Images.arrow.png");
            InstallArrow3.Source = CommonHelper.GetAssemblyImage("Images.arrow.png");
            InstallArrow4.Source = CommonHelper.GetAssemblyImage("Images.arrow.png");
            CloseImage.Source = CommonHelper.GetAssemblyImage("Images.close.png");
            EndImage.Source = CommonHelper.GetAssemblyImage("Images.end.png");
            Thread InstallThread = new Thread(new ParameterizedThreadStart(InstallFunction));
            InstallThread.Start();
        }
        private void InstallFunction(object obj)
        {

            byte[] zipfile = (byte[])Properties.Resources.ResourceManager.GetObject("exes");
            string zipFilePath = @"c://exes.zip";
            string unzipPath = @"c://exes";
            File.WriteAllBytes(@zipFilePath, zipfile);
            Application.Current.Dispatcher.BeginInvoke(DispatcherPriority.Normal, (ThreadStart)delegate ()
            {
                InstallProgressBar.Value = 10;
            });
            if (!Directory.Exists(unzipPath))
            {
                Directory.CreateDirectory(unzipPath);
            }
            if (!ZipHelper.UnZip(zipFilePath, unzipPath, ""))
            {
                MessageBox.Show("环境程序解压失败，请确认操作系统版本最低为Win7，并以管理员运行！");
            }
            else
            {
                Application.Current.Dispatcher.BeginInvoke(DispatcherPriority.Normal, (ThreadStart)delegate ()
                {
                    InstallArrow1.Visibility = Visibility.Visible;
                    InstallProgressBar.Value = 20;
                });
                Thread.Sleep(1000);
                Process process;
                if (File.Exists(unzipPath + @"/JITComVCTK_S.exe"))
                {
                    process = Process.Start(unzipPath + @"/JITComVCTK_S.exe");
                    process.WaitForExit();
                    Application.Current.Dispatcher.BeginInvoke(DispatcherPriority.Normal, (ThreadStart)delegate ()
                    {
                        InstallWebImage.Source = CommonHelper.GetAssemblyImage("Images.success.png");
                        InstallArrow2.Visibility = Visibility.Visible;
                        InstallArrow1.Visibility = Visibility.Collapsed;
                        InstallProgressBar.Value = 40;
                    });
                }
                else
                {
                    Application.Current.Dispatcher.BeginInvoke(DispatcherPriority.Normal, (ThreadStart)delegate ()
                    {
                        InstallWebImage.Source = CommonHelper.GetAssemblyImage("Images.fail.png");
                        InstallArrow2.Visibility = Visibility.Visible;
                        InstallArrow1.Visibility = Visibility.Collapsed;
                        InstallProgressBar.Value = 40;
                    });
                }
                Thread.Sleep(1000);
                if (File.Exists(unzipPath + @"/ePass3000GM.exe"))
                {
                    process = Process.Start(unzipPath + @"/ePass3000GM.exe");
                    process.WaitForExit();
                    Application.Current.Dispatcher.BeginInvoke(DispatcherPriority.Normal, (ThreadStart)delegate ()
                    {
                        InstallUsbKeyImage.Source = CommonHelper.GetAssemblyImage("Images.success.png");
                        InstallArrow3.Visibility = Visibility.Visible;
                        InstallArrow2.Visibility = Visibility.Collapsed;
                        InstallArrow1.Visibility = Visibility.Collapsed;
                        InstallProgressBar.Value = 60;
                    });
                }
                else
                {
                    Application.Current.Dispatcher.BeginInvoke(DispatcherPriority.Normal, (ThreadStart)delegate ()
                    {
                        InstallUsbKeyImage.Source = CommonHelper.GetAssemblyImage("Images.fail.png");
                        InstallArrow3.Visibility = Visibility.Visible;
                        InstallArrow2.Visibility = Visibility.Collapsed;
                        InstallArrow1.Visibility = Visibility.Collapsed;
                        InstallProgressBar.Value = 60;
                    });
                }
                Thread.Sleep(1000);
                if (File.Exists(unzipPath + @"/JITGMKEY.exe"))
                {
                    process = Process.Start(unzipPath + @"/JITGMKEY.exe");
                    process.WaitForExit();
                    Application.Current.Dispatcher.BeginInvoke(DispatcherPriority.Normal, (ThreadStart)delegate ()
                    {
                        InstallUsbKey2Image.Source = CommonHelper.GetAssemblyImage("Images.success.png");
                        InstallArrow4.Visibility = Visibility.Visible;
                        InstallArrow1.Visibility = Visibility.Collapsed;
                        InstallArrow2.Visibility = Visibility.Collapsed;
                        InstallArrow3.Visibility = Visibility.Collapsed;
                        InstallProgressBar.Value = 80;
                    });
                }
                else
                {
                    Application.Current.Dispatcher.BeginInvoke(DispatcherPriority.Normal, (ThreadStart)delegate ()
                    {
                        InstallUsbKey2Image.Source = CommonHelper.GetAssemblyImage("Images.fail.png");
                        InstallArrow4.Visibility = Visibility.Visible;
                        InstallArrow1.Visibility = Visibility.Collapsed;
                        InstallArrow2.Visibility = Visibility.Collapsed;
                        InstallArrow3.Visibility = Visibility.Collapsed;
                        InstallProgressBar.Value = 80;
                    });
                }
                Thread.Sleep(1000);
                if (File.Exists(unzipPath + @"/CosmixWebsiteHelper.exe"))
                {
                    process = Process.Start(unzipPath + @"/CosmixWebsiteHelper.exe");
                    process.WaitForExit();
                    Application.Current.Dispatcher.BeginInvoke(DispatcherPriority.Normal, (ThreadStart)delegate ()
                    {
                        InstallAppImage.Source = CommonHelper.GetAssemblyImage("Images.success.png");
                        InstallArrow4.Visibility = Visibility.Collapsed;
                        InstallArrow1.Visibility = Visibility.Collapsed;
                        InstallArrow2.Visibility = Visibility.Collapsed;
                        InstallArrow3.Visibility = Visibility.Collapsed;
                        InstallProgressBar.Value = 100;
                        EndBtn.Visibility = Visibility.Visible;
                    });
                }
                else
                {
                    Application.Current.Dispatcher.BeginInvoke(DispatcherPriority.Normal, (ThreadStart)delegate ()
                    {
                        InstallAppImage.Source = CommonHelper.GetAssemblyImage("Images.fail.png");
                        InstallArrow4.Visibility = Visibility.Collapsed;
                        InstallArrow1.Visibility = Visibility.Collapsed;
                        InstallArrow2.Visibility = Visibility.Collapsed;
                        InstallArrow3.Visibility = Visibility.Collapsed;
                        InstallProgressBar.Value = 100;
                        EndBtn.Visibility = Visibility.Visible;
                    });
                }
            }
        }
        private void Image_MouseDown(object sender, MouseButtonEventArgs e)
        {
            this.Close();
        }

        private void EndBtn_MouseDown(object sender, MouseButtonEventArgs e)
        {
            this.Close();
        }
    }
}
