
define(["../scripts/services/drag-service.js"], function(DragService) {
  class ArkbuddyAppView {
    constructor() {
      // Methods:
      this._showExitMinimizeModal = this._showExitMinimizeModal.bind(this);
      this._hideExitMinimizeModal = this._hideExitMinimizeModal.bind(this);
      // Background window:
      this._backgroundWindow = overwolf.windows.getMainWindow();
      // Page elements:
      this._modal = document.getElementById("exitMinimizeModal");
      this._closeButton = document.getElementById("closeButton");
      this._minimizeHeaderButton = document.getElementById("minimizeButton");
      this._exitButton = document.getElementById("exit");
      this._minimizeButton = document.getElementById("minimize");
      this._header = document.getElementsByClassName("app-header")[0];
      this._version = document.getElementById("version");
      // Inittialize
      this.init();
    }

    init() {
      // Listen to X button click
      this._closeButton.addEventListener("click", this._showExitMinimizeModal);
      // Listen to minimize click
      this._minimizeHeaderButton.addEventListener("click", () => {
        overwolf.windows.getCurrentWindow(result => {
          overwolf.windows.minimize(result.window.name);
        });
        
      });
      // Close app on exit click
      this._closeButton.addEventListener("click", () => {
        overwolf.windows.getCurrentWindow(result => {
          overwolf.windows.close(result.window.name);
        });
      });

      // When the user clicks anywhere outside of the modal, close it
      window.onclick = function(event) {
        if (event.target == this._modal) {
          this._hideExitMinimizeModal();
        }
      }.bind(this);
      // Enable dragging on this window
      overwolf.windows.getCurrentWindow(result => {
        this.dragService = new DragService(result.window, this._header);
      });
      // Display version
      overwolf.extensions.current.getManifest(manifest => {
        if (!this._version) {
          return;
        }
        this._version.textContent = `Version ${manifest.meta.version}`;
        console.log(manifest.meta.version)
      });
    }

    _showExitMinimizeModal() {
      //this._modal.style.display = "block";
    }

    _hideExitMinimizeModal() {
     //this._modal.style.display = "none";
    }
  }

  return ArkbuddyAppView;
});
