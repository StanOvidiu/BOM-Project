namespace WebApplication1.Controllers
{
    public class SocketIDRequest
    {
        public string SocketID;

        public string GetSocketID()
        {
            return SocketID;
        }

        public void SetSocketID(string socketID)
        {
            this.SocketID = socketID;
        }
    }
}