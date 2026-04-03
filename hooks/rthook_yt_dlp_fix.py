import sys
import yt_dlp

# scdl/patches/trim_filenames.py does `import yt_dlp.__init__` then sets
# `yt_dlp.__init__.validate_options = ...`. In PyInstaller's frozen env,
# `yt_dlp.__init__` resolves to the method-wrapper unless we explicitly
# inject it into the module's __dict__ so attribute lookup finds the module itself.
sys.modules['yt_dlp.__init__'] = yt_dlp
yt_dlp.__dict__['__init__'] = yt_dlp
