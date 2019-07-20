export default function imagePopupController() {
  this.$onInit = function() {
    this.imageName = this.resolve.imageName;
    this.imageUrl = this.resolve.imageUrl;
  };

  this.dismiss = function() {
    this.resolve.dismiss();
  };
}
