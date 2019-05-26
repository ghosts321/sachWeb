using Microsoft.Win32;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Cosmix_Website_Helper.Function
{
    class UpdateUrlProtocol
    {
        /// <summary>
        /// 注册表名称，注意不能有特殊符号，包括下划线
        /// </summary>
        private const string RegName = "sach";
        public static void UpdateProtocol()
        {
            try
            {
                if (Registry.ClassesRoot.OpenSubKey(RegName) != null)
                {
                    RegistryKey rg = Registry.ClassesRoot.OpenSubKey(RegName + "\\shell\\open\\command", true);
                    string
                      oldUrl = rg.GetValue("").ToString(),
                      newUrl = string.Format("\"{0}\" \"%1\"", @"C:\exes\SachCaLoginApp.exe");
                    if (!oldUrl.Equals(newUrl, StringComparison.CurrentCultureIgnoreCase))
                    {
                        rg.SetValue("", newUrl);
                    }
                    Console.WriteLine("注册服务成功CODE0001，请点击任意按键退出...");
                }
                else
                {
                    RegistryKey first = Registry.ClassesRoot.CreateSubKey(RegName);
                    first.SetValue("", RegName + " Protocol");
                    first.SetValue("URL Protocol", "");
                    RegistryKey
                      shell = first.CreateSubKey("shell"),
                      open = shell.CreateSubKey("open"),
                      cmd = open.CreateSubKey("command");
                    cmd.SetValue("", string.Format("\"{0}\" \"%1\"", @"C:\exes\SachCaLoginApp.exe"));
                    Console.WriteLine("注册服务成功CODE0002，请点击任意按键退出...");
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message
                    );
            }
            Console.ReadLine();
        }
    }
}
