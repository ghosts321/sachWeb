using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Cosmix_Website_Helper
{
    class Program
    {
        static void Main(string[] args)
        {
            try
            {
                Function.UpdateUrlProtocol.UpdateProtocol();
            }
            catch (Exception e)
            {
                Console.WriteLine(e.Message);
                Console.ReadLine();
            }
        }
    }
}
