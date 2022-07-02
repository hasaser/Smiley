from tornado.httpserver import HTTPServer
from tornado.options import define, options
from tornado.ioloop import IOLoop
from tornado.web import Application, RequestHandler, StaticFileHandler
from tornado.template import Loader
import os
define('port', default=os.environ.get("PORT", 8888), help='port to listen on')
define("BASE_DIR", default=os.path.join(os.getcwd(), "templates"))
define("DIST", default=os.path.join(os.getcwd(), "dist"))
define("TEMP", default=os.path.join(os.getcwd(), "templates"))

class MainHandler(RequestHandler):
    def get(self):
        loader = Loader(options.TEMP)
        sayfa = loader.load("index.html").generate()
        self.write(sayfa)

if __name__ == '__main__':
    """Construct and serve the tornado application."""
    app = Application([
        (r"/", MainHandler),
        # (r"/static/(.*)", StaticFileHandler, {"path": os.path.join(os.getcwd(), 'static')}),
        (r"/dist/(.*)", StaticFileHandler, {"path": os.path.join(os.getcwd(), 'dist')})
    ],
        # static_path=os.path.join(os.getcwd(), "src")
    )
    http_server = HTTPServer(app)
    http_server.listen(options.port)
    IOLoop.current().start()
