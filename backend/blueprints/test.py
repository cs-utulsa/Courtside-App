from flask import Blueprint, render_template

test = Blueprint('test', __name__)

@test.route('/test/verifySuccess', methods=["GET"])
def verify():
    return render_template("pages/verifyEmailSuccessPage.html")

@test.route('/test/reset', methods=["GET"])
def reset():
    return render_template("resetPasswordPage.html")

@test.route('/test/passSuccess', methods=["GET"])
def p_success():
    return render_template("pages/passwordResetSuccessPage.html")