'use strict'
/**
 * The function LaundryMachine is used to do Laundry.
 */
function LaundryMachine() {

    /**
     * The doLaundry method is used to perform laundry operations wash, dry and fold.
     */
    function doLaundry(){
        wash(() => dry(() => fold(() => console.log('Done!!'))));
    };

    /**
     * Callback for nested operations
     * @callback  nestedCallback
     * @param{nestedCallback} 
     */

    /**
     * The function wash performs wash operation of Laundry
     * @param {nestedCallback} callback
     */
    function wash(callback) {
        setTimeout(function () {
            console.log('wash');
            callback();
        }, 3000);
    };

    /**
     * The function dry performs dry operation of Laundry
     * @param {nestedCallback} callback
     */
    function dry(callback) {
        setTimeout(function () {
            console.log('dry');
            callback();
        }, 2000);
    };

    /**
     * The function fold performs fold operation of Laundry
     * @param {nestedCallback} callback
     */
    function fold(callback) {
        setTimeout(function () {
            console.log('fold');
            callback();
        }, 1000);
    };

    /**
     * The function bindEvents binds the events triggered in the view.
     */
    LaundryMachine.prototype.bindEvents = () => {
        $('#btn_do_laundry').on('click', () => {
            $('#div_laundry').removeClass('d-none');
            doLaundry();
        });
    };
};

/**
 * Called once the document is loaded.
 */
$(() => {
    new LaundryMachine().bindEvents();
});
